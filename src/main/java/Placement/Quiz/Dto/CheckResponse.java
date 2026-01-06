package Placement.Quiz.Dto;


import jakarta.annotation.Nullable;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Setter
public class CheckResponse {
    private boolean correct;
    @Nullable
    private String correctAnswer;
}
