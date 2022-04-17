package PlanIt.PlanitFrontend.controllerStartSite;

import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlanItController {
	
	@RequestMapping(method=RequestMethod.POST, value="/test")
	public String getTest(@ModelAttribute("startdate") String start, @ModelAttribute("enddate") String end) {
		return start + " " + end;
	}
}
