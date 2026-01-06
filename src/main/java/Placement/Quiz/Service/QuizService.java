package Placement.Quiz.Service;


import Placement.Quiz.Dto.QuestionResponse;
import Placement.Quiz.Dto.QuizListResponse;
import Placement.Quiz.Model.Question;
import Placement.Quiz.Repository.QuizRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private QuizRepository quizRepository;
    private ModelMapper modelMapper=new ModelMapper();
    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public List<QuizListResponse> getQuizzes() {
        var  quizList=quizRepository.findAll();

        return quizList.stream().map(q->modelMapper.map(q,QuizListResponse.class)).collect(Collectors.toList());
    }


}
