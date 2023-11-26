package com.rohit.blogappapis.services.impl;

import com.rohit.blogappapis.services.FileService;
import org.apache.tomcat.util.http.fileupload.InvalidFileNameException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {
       String name= file.getOriginalFilename();
       String randomID= UUID.randomUUID().toString();

       if(!name.substring(name.lastIndexOf(".")).equalsIgnoreCase(".png")
       && !name.substring(name.lastIndexOf(".")).equals(".jpeg")
       && !name.substring(name.lastIndexOf(".")).equals(".jpg"))throw new InvalidFileNameException(name,"Invalid File");

       String fileName=randomID.concat(name.substring(name.lastIndexOf(".")));
       String filePath=path+ File.separator+fileName;
       File f=new File(path);
       if(!f.exists())
       {
           f.mkdir();
       }
        Files.copy(file.getInputStream(), Paths.get(filePath));

        return fileName;
    }

    @Override
    public InputStream getResource(String path, String filename) throws FileNotFoundException {
        String fullPath= path+ File.separator+filename;
        //File.separator is / only in some OS \ is used in some / is used as separator

        InputStream is=new FileInputStream(fullPath);
        //db logic to return inputStream
        return is;

    }


}
