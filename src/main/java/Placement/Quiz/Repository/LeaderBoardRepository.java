package Placement.Quiz.Repository;

import Placement.Quiz.Model.LeaderBoard;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaderBoardRepository extends MongoRepository<LeaderBoard, String> {
    Optional<LeaderBoard> findByEmail(String email);

    List<LeaderBoard> findAllByOrderByScoreDesc();
}
