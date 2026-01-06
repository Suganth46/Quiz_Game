package Placement.Quiz.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "leaderboard")
public class LeaderBoard  {

    private String id;

    private String username;
    private String email;
    private Integer score;
}
