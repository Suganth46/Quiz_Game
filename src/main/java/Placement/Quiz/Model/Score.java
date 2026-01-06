package Placement.Quiz.Model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "scores")
public class Score {
    @Id
    private String id;

    private String userId;
    private String username;
    private String email;
    private String quizId;
    private int score;
    private long submittedAt;

    public Score(String userId, String username, String email,
                 String quizId, int score) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.quizId = quizId;
        this.score = score;
        this.submittedAt = System.currentTimeMillis();
    }
}