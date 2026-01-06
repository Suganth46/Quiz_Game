package Placement.Quiz.Service;

import Placement.Quiz.Dto.CheckResponse;
import Placement.Quiz.Dto.QuestionResponse;
import Placement.Quiz.Repository.QuestionsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private QuestionsRepository questionsRepository;
    private ModelMapper modelMapper=new ModelMapper();
    public QuestionService(QuestionsRepository questionsRepository ) {
        this.questionsRepository = questionsRepository;
    }

    public List<QuestionResponse> getQuestions(String quizId) {
        var questions=questionsRepository.findAllByQuizId(quizId);
        return questions.stream().map(q-> modelMapper.map(q, QuestionResponse.class)).collect(Collectors.toList());
    }

    public CheckResponse check(String id, String userAnswer) {
        var question=questionsRepository.findById(id).orElseThrow(()-> new RuntimeException("Question not found"));
        CheckResponse checkResponse=new CheckResponse();
        if(userAnswer.equals(question.getCorrectAnswer())){
            checkResponse.setCorrect(true);
            checkResponse.setCorrectAnswer(question.getCorrectAnswer());
        }
        else {
            checkResponse.setCorrect(false);
            checkResponse.setCorrectAnswer(question.getCorrectAnswer());
        }
        return checkResponse;
    }
}
