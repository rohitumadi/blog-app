package com.rohit.blogappapis.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //get the jwt token from the request
        //Authorization is the key and value of which is token
        String requestToken=request.getHeader("Authorization");
        //Bearer 34l2k3hn4l2k
        System.out.println("requestToken:"+requestToken);
        String username=null;
        String token=null;
        if(requestToken!=null &&requestToken.startsWith("Bearer"))
        {
            //remove Bearer word from token
            token=requestToken.substring(7);
            try{

            username=this.jwtTokenHelper.getUsernameFromToken(token);
            }catch (IllegalArgumentException e)
            {
                System.out.println("unable to get jwt token");
            }
            catch (ExpiredJwtException e)
            {
                System.out.println("jwt has expired");
            }
            catch (MalformedJwtException e)
            {
                System.out.println("invalid jwt");
            }

        }
        else {
            System.out.println("jwt does not begin with Bearer");
        }

        //validate jwt token
        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null)
        {
            UserDetails userDetails=this.userDetailsService.loadUserByUsername(username);
            System.out.println("user details "+userDetails);
            if(this.jwtTokenHelper.validateToken(token,userDetails))
            {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }else {
                System.out.println("Invalid jwt token");
            }

        }else {
            System.out.println("username is null or context is not null");
        }
        filterChain.doFilter(request,response);




    }
}
