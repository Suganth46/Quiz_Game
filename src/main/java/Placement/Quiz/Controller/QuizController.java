package Placement.Quiz.Controller;


import Placement.Quiz.Dto.QuizListResponse;
import Placement.Quiz.Service.QuizService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private QuizService quizService;
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<QuizListResponse>> getQuizzes(@RequestHeader("Authorization") String authHeader) {
        var quizList=quizService.getQuizzes();
        return ResponseEntity.ok().body(quizList);
    }
}
