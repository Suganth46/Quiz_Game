package Placement.Quiz.Model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "quizzes")
public class Quiz {
    @Id
    private String id;

    private String name;
    private String description;
    private String category;
    private String difficulty;
    private int questionCount;
    private long createdAt;

    public Quiz(String name, String description, String category,
                String difficulty, int questionCount) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.difficulty = difficulty;
        this.questionCount = questionCount;
        this.createdAt = System.currentTimeMillis();
    }
}
