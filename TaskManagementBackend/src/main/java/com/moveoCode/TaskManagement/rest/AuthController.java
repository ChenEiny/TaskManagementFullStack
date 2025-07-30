package com.moveoCode.TaskManagement.rest;

import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Value("${cognito.client-id}")
    private String clientId;

    @Value("${cognito.client-secret}")
    private String clientSecret;

    @Value("${cognito.redirect-uri}")
    private String redirectUri;

    @Value("${cognito.token-uri}")
    private String tokenUri;

    @GetMapping("/user/me")
    public Map<String, Object> getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> result = new HashMap<>();
        result.put("username", jwt.getClaim("username"));
        result.put("sub", jwt.getSubject());
        result.put("claims", jwt.getClaims());
        logger.info("[/user/me] User info requested: username={}, sub={}", jwt.getClaim("username"), jwt.getSubject());
        return result;
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("access_token", "")
                .httpOnly(true)
                .secure(false) // set to true in production
                .path("/project/0")
                .maxAge(0) // Expire immediately
                .sameSite("Lax")
                .build();
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(Map.of("status", "logged_out"));
    }



    @PostMapping("/callback")
    public ResponseEntity<?> handleCallback(@RequestBody Map<String, String> payload, HttpServletResponse response) {
        logger.info("=====> /api/callback HIT <=====");
        String code = payload.get("code");
        logger.info("[/callback] Received code from frontend: {}", code);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("code", code);
        body.add("client_id", clientId);
        body.add("redirect_uri", redirectUri);

        logger.info("  clientSecret is {}", (clientSecret == null || clientSecret.isEmpty() ? "NOT SET" : "SET"));

        if (clientSecret != null && !clientSecret.isEmpty()) {
            headers.setBasicAuth(clientId, clientSecret);
        }

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        try {
            ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenUri, request, Map.class);

            logger.info("[/callback] Cognito token response body: {}", tokenResponse.getBody());

            if (tokenResponse.getBody() == null) {
                logger.error("[/callback] No body in Cognito token response!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No token response");
            }

            Object accessTokenObj = tokenResponse.getBody().get("access_token");
            if (accessTokenObj == null) {
                logger.error("[/callback] No access_token in token response: {}", tokenResponse.getBody());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("No access_token in token response: " + tokenResponse.getBody());
            }
            String accessToken = accessTokenObj.toString();

            // Set ONLY the access_token as HTTP-only cookie, 1 hour expiry
            ResponseCookie accessCookie = ResponseCookie.from("access_token", accessToken)
                    .httpOnly(true)
                    .secure(false) // true in production!
                    .path("/")
                    .maxAge(3600) // 1 hour
                    .sameSite("Lax")
                    .build();

            response.setHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());

            logger.info("[/callback] JWT token set in HTTP-only cookie.");
            return ResponseEntity.ok(Map.of("status", "authenticated"));
        } catch (Exception e) {
            logger.error("[/callback] Token exchange failed: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Token exchange failed: " + e.getMessage());
        }
    }




}
