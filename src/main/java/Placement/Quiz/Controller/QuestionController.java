package Placement.Quiz.Controller;


import Placement.Quiz.Dto.CheckRequest;
import Placement.Quiz.Dto.CheckResponse;
import Placement.Quiz.Dto.QuestionResponse;
import Placement.Quiz.Service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }
    @GetMapping("/{quizId}")
    public ResponseEntity<List<QuestionResponse>> getQuestions(@RequestHeader("Authorization") String authHeader, @PathVariable("quizId") String quizId) {
        var questions=questionService.getQuestions(quizId);
        return ResponseEntity.ok().body(questions);
    }

    @PostMapping("/check")
    public ResponseEntity<CheckResponse> check(@RequestHeader("Authorization") String authHeader, @RequestBody CheckRequest checkRequest) {
        var checkResponse=questionService.check(checkRequest.getId(),checkRequest.getUserAnswer());
        return  ResponseEntity.ok().body(checkResponse);
    }
}
