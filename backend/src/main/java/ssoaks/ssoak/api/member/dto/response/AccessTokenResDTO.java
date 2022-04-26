package ssoaks.ssoak.api.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AccessTokenResDTO {
    private char path;
    private String accessToken;
}