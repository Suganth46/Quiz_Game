package Placement.Quiz.Controller;


import Placement.Quiz.Dto.LoginRequest;
import Placement.Quiz.Dto.SignUpRequest;
import Placement.Quiz.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
            var user=userService.signUp(signUpRequest.getUsername(),signUpRequest.getPassword(),signUpRequest.getEmail());
            return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
             var user=userService.login(loginRequest.getEmail(),loginRequest.getPassword());
             return ResponseEntity.ok(user);
    }
}
