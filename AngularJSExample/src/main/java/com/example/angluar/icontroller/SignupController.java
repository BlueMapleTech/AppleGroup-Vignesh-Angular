package com.example.angluar.icontroller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.angluar.controllerimpl.ISignupController;
import com.example.angluar.dto.User;
import com.example.angluar.iservice.ISignupService;

@Controller
@RequestMapping(value = "/signup")
public class SignupController implements ISignupController {

	private static final Logger LOG = LoggerFactory
			.getLogger(SignupController.class);

	@Autowired
	private ISignupService signupService;

	public ISignupService getSignupService() {
		return signupService;
	}

	public void setSignupService(ISignupService signupService) {
		this.signupService = signupService;
	}

	@RequestMapping(value = "/createUser", method = RequestMethod.POST, headers = "Accept=application/json")
	@ResponseBody
	public User insert_user(@RequestBody User user) {

		LOG.info("create user service has been called.!");
		return this.signupService.insert_user(user);
	}
	@RequestMapping(value = "/updatePersons", method = RequestMethod.POST, headers = "Accept=application/json")
	@ResponseBody
	public User update_user(@RequestBody User user) {
		LOG.info("java"+user.getAddress());
		return signupService.update_user(user);
	}

	@RequestMapping(value = "/personlist", method = RequestMethod.POST, headers = "Accept=application/json")
	@ResponseBody
	public List<User> find_all_users() {
		LOG.debug("list will be called");
		List<User> user = signupService.find_all_users();
		LOG.debug("listofperson" + user.toString());
		/* return this.signupService.find_all_users(); */
		return user;
	}
	@RequestMapping(value = "/findUser", method = RequestMethod.POST, headers = "Accept=application/json")
	@ResponseBody
	public User find_user(@RequestParam("userId")long userId) {
		LOG.debug("userId can be find");
		return signupService.find_user(userId);
	}
	@RequestMapping(value = "/deleteUser", method = RequestMethod.POST, headers = "Accept=application/json")
	@ResponseBody
	
	public void delete_user(@RequestParam("userId")long userId) {
		
		LOG.debug("deletemethod will be called");
		
	 signupService.delete_user(userId);

	}

	@RequestMapping(value = "/performLogin", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public Object performLogin(
			@RequestParam("emailAddress") String emailAddress,
			@RequestParam("password") String password) {
		LOG.debug(password);
		LOG.debug(emailAddress);
		if (emailAddress == null || emailAddress.isEmpty() || password == null
				|| password.isEmpty()) {
			LOG.debug("Invalid username/password, please try again!");
			return null;
		}
		User user = signupService.performLogin(emailAddress);
		if (user != null) {
			if (user.getEmailAddress().equals(emailAddress)
					&& (user.getPassword().equals(password))) {
				
				LOG.debug("Returned user:" + user.toString());
				
				
				
				return user;
			}else {
				return user.equals(null);
			}
		}
		return null;
	}

	
}
