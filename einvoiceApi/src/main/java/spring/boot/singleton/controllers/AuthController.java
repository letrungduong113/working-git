package spring.boot.singleton.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import spring.boot.singleton.config.JwtProvider;
import spring.boot.singleton.models.*;
import spring.boot.singleton.models.auth.*;
import spring.boot.singleton.repositories.UserRepository;

import java.util.Random;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender emailSender;

    @PostMapping("/login")
    public ResponseEntity authenticateUser(@RequestBody LoginRequest loginRequest) {
        // Xác thực từ username và password.
        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getPhoneNumber(),
                        loginRequest.getPassword()
                )
            );
        } catch (AuthenticationException ex) {
            return new ResponseEntity("Your phone number or password is wrong !", HttpStatus.BAD_REQUEST);
        }

        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken((AuthDetails) authentication.getPrincipal());

        // Trả về response cho client
        LoginResponse res = new LoginResponse();
        res.setUserId(((AuthDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser().getId());
        res.setPhoneNumber(((AuthDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser().getUsername());
        res.setToken("Bearer " + jwt);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/logout")
    public ResponseEntity logoutUser() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logout successfully !");
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody RegisterRequest registerRequest ) {
        if (userRepository.findByUsername(registerRequest.getPhoneNumber()) == null) {
            if (registerRequest.getPassword().equals(registerRequest.getConfPassword())){
                User u = new User();

                u.setName(registerRequest.getName());
                u.setUsername(registerRequest.getPhoneNumber());
                u.setEmail(registerRequest.getEmail());
                u.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
                u.setRole(registerRequest.getRole());

                userRepository.save(u);

                // login
                LoginRequest loginRequest = new LoginRequest();
                loginRequest.setPhoneNumber(registerRequest.getPhoneNumber());
                loginRequest.setPassword(registerRequest.getPassword());
                return authenticateUser(loginRequest);
            }
            else return new ResponseEntity("Confirmed password failed!", HttpStatus.BAD_REQUEST);
        }
        else {
            return new ResponseEntity("Account exists!", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/recover/send-mail")
    public ResponseEntity sendMailRecover(@RequestBody RecoveryRequest request) {
        User u = userRepository.findByEmail(request.getEmail());

        if(u == null) {
            return new ResponseEntity("This email doesn't bind to any account!", HttpStatus.BAD_REQUEST);
        }

        Random rnd = new Random();
        int number = rnd.nextInt(999999);

        // this will convert any number sequence into 6 character.
        String code = String.format("%06d", number);

        u.setRecovery(code);
        userRepository.save(u);

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(u.getEmail());
        message.setSubject("Recovery code");
        message.setText("Your code is: " + code);

        this.emailSender.send(message);

        return ResponseEntity.ok("Verify code was sent to your mail");
    }

    @PostMapping("/recover/change-password")
    public ResponseEntity recoverPassword(@RequestBody RecoveryRequest request) {
        User u = userRepository.findByEmail(request.getEmail());

        if(!request.getPassword().equals(request.getConfPassword())) {
            return new ResponseEntity("Confirmed password is wrong !", HttpStatus.BAD_REQUEST);
        }

        if(!request.getCode().equals(u.getRecovery())) {
            return new ResponseEntity("Verified code is invalid !", HttpStatus.BAD_REQUEST);
        }

        u.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(u);

        return ResponseEntity.ok("Your password has changed successfully !");
    }
}





