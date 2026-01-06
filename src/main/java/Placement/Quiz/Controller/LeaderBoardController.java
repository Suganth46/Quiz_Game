package Placement.Quiz.Controller;


import Placement.Quiz.Dto.ScoreRequest;
import Placement.Quiz.Dto.leaderBoardResponse;
import Placement.Quiz.Service.LeaderBoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderBoardController {

    private LeaderBoardService leaderBoardService;

    public LeaderBoardController(LeaderBoardService leaderBoardService) {
        this.leaderBoardService = leaderBoardService;
    }

    @PostMapping("/submit-score")
    public ResponseEntity<?> submitScore(@RequestHeader("Authorization") String authHeader , @RequestBody ScoreRequest scoreRequest) {
         var submitResponse=leaderBoardService.submitScore(authHeader,scoreRequest.getScore(),scoreRequest.getQuizId());
         return  ResponseEntity.ok(submitResponse);
    }

    @GetMapping
    public List<leaderBoardResponse> getLeaderBoard(@RequestHeader("Authorization") String authHeader) {
        var leaderboard=leaderBoardService.getLeaderBoard();
        return leaderboard;
    }
}
