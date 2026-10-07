package com.game.back_end.security;

import java.util.Map;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Component 
@AllArgsConstructor
public class UserDetailsJwtPrincipalConverter implements Converter<Jwt, OAuth2AuthenticatedPrincipal> {

    private final UserDetailsService users;

    @Override
    public OAuth2AuthenticatedPrincipal convert(Jwt jwt) {
        UserDetails user = this.users.loadUserByUsername(jwt.getSubject());
        return new JwtUser(jwt, user);
    }

    private static final class JwtUser extends User implements OAuth2AuthenticatedPrincipal {
    
        private final Jwt jwt;
    
        private JwtUser(Jwt jwt, UserDetails user) {
            super(user.getUsername(), user.getPassword(), user.isEnabled(), user.isAccountNonExpired(),
                    user.isCredentialsNonExpired(), user.isAccountNonLocked(), user.getAuthorities());
            this.jwt = jwt;
        }
    
        @Override
        public String getName() {
            return this.jwt.getSubject();
        }
    
        @Override
        public Map<String, Object> getAttributes() {
            return this.jwt.getClaims();
        }
    }
}
