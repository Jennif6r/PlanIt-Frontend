package PlanIt.PlanitFrontend.controller;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import main.AppointmentModel;

@RestController
public class PlanItController {
	
	@RequestMapping(method=RequestMethod.POST, value="/test")
	public String getAppointmentsInWeek(@ModelAttribute("startdate") String start, @ModelAttribute("enddate") String end) {
		
		return start + " " + end;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/create")
	public AppointmentModel createAppointment(@RequestBody AppointmentModel appointment){
		// der Code
		return appointment;
	}
}
