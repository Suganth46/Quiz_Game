package Placement.Quiz.Repository;

import Placement.Quiz.Model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionsRepository extends MongoRepository<Question,String> {
    List<Question> findAllByQuizId(String quizId);
}
