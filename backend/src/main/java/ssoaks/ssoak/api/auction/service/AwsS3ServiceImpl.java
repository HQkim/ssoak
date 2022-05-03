package ssoaks.ssoak.api.auction.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;


import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AwsS3ServiceImpl implements AwsS3Service{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    @Override
    public String uploadImage(MultipartFile multipartFile) {

        String imageUrl = createFileName(multipartFile.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize()); // byte
        objectMetadata.setContentType(multipartFile.getContentType()); // contentType

        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(
                    new PutObjectRequest(bucket, imageUrl, inputStream, objectMetadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, String.format("파일(%s) 업로드에 실패했습니다.", multipartFile.getOriginalFilename()));
        }
        return "https://ssoak-bucket.s3.ap-northeast-2.amazonaws.com/" + imageUrl;
    }

    @Override
    public Boolean deleteImage(String imageUrl) {
        amazonS3Client.deleteObject(bucket, imageUrl);
        return null;
    }

    @Override
    public String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    @Override
    public String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            log.error(e.getMessage());
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

}
