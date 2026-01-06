package Placement.Quiz.Service;

import Placement.Quiz.Dto.LoginResponse;
import Placement.Quiz.Model.User;
import Placement.Quiz.Repository.UserRepository;
import Placement.Quiz.Util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;

    public UserService(JwtUtil jwtUtil, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> signUp(String username, String password, String email) {
        if(userRepository.existsByEmail(email)){
            return ResponseEntity.badRequest().body(Map.of("Email already exists",true));
        }
        User user=new User();
        if(username!=null && !username.isEmpty()&&password!=null && !password.isEmpty()&&email!=null && !email.isEmpty()) {
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            user.setEmail(email);
        }
         userRepository.save(user);
        return ResponseEntity.ok().body(Map.of("user regestration success",true));
    }

    public LoginResponse login(String email, String password) {
        User user=userRepository.findByEmail(email).orElseThrow(()-> new  RuntimeException(" Invalid Email Or Password"));

        if(!passwordEncoder.matches(password,user.getPassword())){
            throw new RuntimeException("Invalid Password");
        }

        String token=jwtUtil.generateToken(email);
        return new LoginResponse(token, user.getId(), user.getUsername());
    }
}
