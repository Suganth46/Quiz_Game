package Placement.Quiz.Dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QuizListResponse {

    private String id;
    private String name;
    private String description;
    private String category;
    private String difficulty;
    private int questionCount;
}
