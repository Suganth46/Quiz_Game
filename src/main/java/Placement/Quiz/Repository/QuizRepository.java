package Placement.Quiz.Repository;

import Placement.Quiz.Model.Question;
import Placement.Quiz.Model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface QuizRepository extends MongoRepository<Quiz, String> {
}
