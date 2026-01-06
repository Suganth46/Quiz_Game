package Placement.Quiz.Dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class leaderBoardResponse {
    private String username;
    private String email;
    private Integer score;
}
