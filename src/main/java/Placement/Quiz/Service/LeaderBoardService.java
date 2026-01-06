package Placement.Quiz.Service;

import Placement.Quiz.Dto.leaderBoardResponse;
import Placement.Quiz.Model.LeaderBoard;
import Placement.Quiz.Model.User;
import Placement.Quiz.Repository.LeaderBoardRepository;
import Placement.Quiz.Repository.UserRepository;
import Placement.Quiz.Util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LeaderBoardService {

    private JwtUtil jwtUtil;
    private LeaderBoardRepository leaderBoardRepository;
    private UserRepository userRepository;

    public LeaderBoardService(JwtUtil jwtUtil, LeaderBoardRepository leaderBoardRepository, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.leaderBoardRepository = leaderBoardRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> submitScore(String authHeader, Integer score ,String quizId) {

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        User user=userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("User not found"));
        LeaderBoard  leaderBoard=leaderBoardRepository.findByEmail(email).orElse(new LeaderBoard());

        leaderBoard.setUsername(user.getUsername());
        leaderBoard.setScore(score);
        leaderBoard.setEmail(email);
        leaderBoardRepository.save(leaderBoard);
        return ResponseEntity.ok(Map.of("Score submitted successfully",1));
    }

    public List<leaderBoardResponse> getLeaderBoard() {
        return leaderBoardRepository.findAllByOrderByScoreDesc()
                .stream()
                .map(lb -> new leaderBoardResponse(
                        lb.getUsername(),
                        lb.getEmail(),
                        lb.getScore()
                )).toList();
    }
}
