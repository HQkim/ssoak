package ssoaks.ssoak.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BaseResponseDTO {
    private Integer statusCode;
    private String message;
}
