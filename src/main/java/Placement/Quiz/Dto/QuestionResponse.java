package Placement.Quiz.Dto;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QuestionResponse {
        private String id;
        private String question;
        private String optionA;
        private String optionB;
        private String optionC;
        private String optionD;
}
