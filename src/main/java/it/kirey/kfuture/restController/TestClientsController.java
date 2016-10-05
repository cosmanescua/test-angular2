package it.kirey.kfuture.restController;



import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import it.kirey.kfuture.dao.ITestClientsDao;
import it.kirey.kfuture.entity.TestClients;


//rest controller that treats the requests corresponding to CRUD operations
@RestController
@RequestMapping("/rest")
public class TestClientsController {
	@Autowired
	private ITestClientsDao testClientsDao;
	
	@RequestMapping(value = "/clients", method = RequestMethod.GET,produces = "application/json")
	public ResponseEntity<ArrayList<TestClients>> getAllClients() {
		System.out.println("rest controller-all clients");
		ArrayList<TestClients> clientsList=testClientsDao.getAllClients();
		return new ResponseEntity<ArrayList<TestClients>>(clientsList, HttpStatus.OK);	
	}
	@RequestMapping(value = "/addClient", method = RequestMethod.POST,consumes={MediaType.APPLICATION_JSON_VALUE}, headers="Accept=application/json", produces={MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<TestClients> addClient(@RequestBody TestClients client) {
		System.out.println("rest controller-add client");
		TestClients addedClient=testClientsDao.saveClient(client);
		return new ResponseEntity<TestClients>(addedClient, HttpStatus.OK);	
	}
	@RequestMapping(value = "/updateClient", method = RequestMethod.POST,consumes={MediaType.APPLICATION_JSON_VALUE}, headers="Accept=application/json", produces={MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<String> updateClient(@RequestBody TestClients client) {
		System.out.println("rest controller-update client");
		testClientsDao.updateClient(client);
		return new ResponseEntity<String>("ok", HttpStatus.OK);	
	}
	@RequestMapping(value="/removeClient/{id}",method=RequestMethod.GET,produces={MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<String> removeClient(@PathVariable int id){
		System.out.println("rest controller-remove client with id: "+id);
		testClientsDao.deleteClientById(id);
		return new ResponseEntity<String>("ok", HttpStatus.OK);	
	}

}
