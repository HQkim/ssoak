package ssoaks.ssoak.api.auction.service;

import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {

    String uploadImage(MultipartFile multipartFile);

    String createFileName(String fileName);

    String getFileExtension(String fileName);
}
