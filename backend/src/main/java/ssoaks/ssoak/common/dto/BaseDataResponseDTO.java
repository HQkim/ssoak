package ssoaks.ssoak.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BaseDataResponseDTO<T> {

    private Integer statusCode;
    private String message;
    private T data;

}
