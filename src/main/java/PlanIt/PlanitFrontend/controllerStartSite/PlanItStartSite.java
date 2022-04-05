package PlanIt.PlanitFrontend.controllerStartSite;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PlanItStartSite {
	
	@RequestMapping("/plan-it")
	public String index(Model model) {
		return "start.html";
	}

}
