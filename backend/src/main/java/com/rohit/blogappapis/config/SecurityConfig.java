package com.rohit.blogappapis.config;

import com.rohit.blogappapis.security.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig  {
        @Autowired
        private CustomUserDetailService customUserDetailService;
        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http
                    .authorizeHttpRequests((authz) -> authz
                            .anyRequest().authenticated()
                    )
                    //log in webpage will not be shown
                    //instead alert box will be shown
                    .httpBasic(Customizer.withDefaults())

                    .csrf((csrf) ->csrf.disable())
                    .authenticationProvider(daoAuthenticationProvider());

            return http.build();
        }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
         DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
         provider.setUserDetailsService(this.customUserDetailService);
         provider.setPasswordEncoder(bCryptPasswordEncoder());
         return provider;

    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    }


