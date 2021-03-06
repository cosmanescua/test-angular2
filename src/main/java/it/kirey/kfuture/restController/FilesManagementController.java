package it.kirey.kfuture.restController;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.ArrayList;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.io.ByteArrayDataInput;

import it.kirey.kfuture.dao.ITestFileManagementDao;
import it.kirey.kfuture.entity.TestClients;
import it.kirey.kfuture.entity.TestFileManagement;

@RestController
@RequestMapping("/rest")
public class FilesManagementController {
	@Autowired
	ITestFileManagementDao filesManagement;
	
	@RequestMapping(value="/testFileUpload", method=RequestMethod.POST,consumes ={MediaType.MULTIPART_FORM_DATA_VALUE})
    public @ResponseBody String handleFileUpload(@RequestParam("file") MultipartFile file){
		String originalFilename=file.getOriginalFilename();
		System.out.println("rest file upload controller -- "+originalFilename);
		if (!file.isEmpty()) {
            try {
            	File directory = new File("uploads");
        	    if (! directory.exists()){
        	    	System.out.println("Uploads directory created");
        	        directory.mkdir();
        	    }
                byte[] bytes = file.getBytes();
                File uploadedFile=new File(directory.getPath()+File.separator+originalFilename);
                System.out.println("File path "+ uploadedFile.getAbsolutePath());
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(uploadedFile));
                stream.write(bytes);
                stream.close();
                TestFileManagement fileObj=new TestFileManagement();
                fileObj.setFilename(originalFilename);
                fileObj.setFilepath(uploadedFile.getPath());
                filesManagement.saveFileDetails(fileObj);
                return "You successfully uploaded " +originalFilename+ "!";
            } catch (Exception e) {
                return "You failed to upload " + originalFilename + " => " + e.getMessage();
            }
        } else {
            return "You failed to upload the file because the file was empty.";
        }
    }
	@RequestMapping(value="/getFiles", method=RequestMethod.GET)
	public  ResponseEntity<ArrayList<TestFileManagement>>  getAllFiles(){
		System.out.println("rest all files controller");
		ArrayList<TestFileManagement> files=filesManagement.getAllFiles();
		return new ResponseEntity<ArrayList<TestFileManagement>>(files, HttpStatus.OK);	
	}
	@RequestMapping(value="/downloadFile/{id}", method=RequestMethod.GET,produces={MediaType.APPLICATION_OCTET_STREAM_VALUE})
	public ResponseEntity<byte[]> downloadFile(@PathVariable int id) throws Exception {
	    	TestFileManagement testFile=filesManagement.findFileById(id);
	        String filePathToBeServed =testFile.getFilepath(); 
	        File fileToDownload = new File(filePathToBeServed);
	        InputStream inputStream=new FileInputStream(fileToDownload);
	        return ResponseEntity
		            .ok()
		            .header("Content-Type", "application/octet-stream")
		            .contentType(MediaType.parseMediaType(URLConnection.guessContentTypeFromName(fileToDownload.getName())))	            
		            .body(IOUtils.toByteArray(inputStream));
	 
	}
	@RequestMapping(value="/downloadFileOk/{id}", method=RequestMethod.GET,produces ={MediaType.APPLICATION_OCTET_STREAM_VALUE})
	public void downloadFile2(HttpSession session,HttpServletResponse response,@PathVariable int id) throws Exception {
	    try {
	    	TestFileManagement testFile=filesManagement.findFileById(id);
	        String filePathToBeServed =testFile.getFilepath(); 
	        File fileToDownload = new File(filePathToBeServed);
	        response.setContentLength((int) fileToDownload.length());
	        //response.setCharacterEncoding("UTF-16");
	        response.setHeader("File-Type", URLConnection.guessContentTypeFromName(fileToDownload.getName()));
	        response.setContentType("application/octet-stream");
	        response.setHeader("Content-Disposition", "attachment; filename="
	                + fileToDownload.getName());
	        ServletOutputStream outStream = response.getOutputStream();
	        byte[] bbuf = new byte[(int) fileToDownload.length()];
	        InputStream in = new FileInputStream(fileToDownload);
	        int length = 0;
	        while ((in != null) && ((length = in.read(bbuf)) != -1)) {
	            outStream.write(bbuf, 0, length);
	        }
	        in.close();
	        outStream.flush();
	    } catch (Exception e){
	        e.printStackTrace();
	    }

	}

}
