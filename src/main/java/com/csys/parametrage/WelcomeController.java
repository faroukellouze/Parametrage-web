package com.csys.parametrage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Locale;
import java.util.Map;

@Controller
public class WelcomeController {

    private static final Logger logger = LoggerFactory.getLogger(WelcomeController.class);

    @Value("${welcome.message:test}")
    private String message = "Hello World";

    @RequestMapping("/")
    public String authentification(Map<String, Object> model, Locale locale) {
        model.put("message", this.message);
        return "/WEB-INF/jsp/authentification/authentification.jsp";
    }

    @RequestMapping("menu")
    public String menu(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/menu/menu.jsp";
    }

    @RequestMapping("templatesMenu")
    public String templatesMenu(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/templates/menu.jsp";
    }

    @RequestMapping("Societe")
    public String motif(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/Societe/Societe.jsp";
    }

    @RequestMapping("logout")
    public String logout(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/logout.jsp";
    }

    @RequestMapping("MajSociete")
    public String MajSociete(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/Societe/MajSociete.jsp";
    }

    @RequestMapping("ajoutRapide")
    public String ajoutRapide(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/Societe/ajoutRapide.jsp";
    }

    @RequestMapping("modals")
    public String modals(Map<String, Object> model, Locale locale) {
        logger.info("modals! The client locale is {}.", locale);
        return "/WEB-INF/jsp/menu/modals.jsp";
    }

    @RequestMapping("Prestation")
    public String Prestation(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/Prestation/Prestation.jsp";
    }

    @RequestMapping("MajPrestation")
    public String MajPrestation(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/Prestation/MajPrestation.jsp";
    }

    @RequestMapping("famillePrestation")
    public String famillePrestation(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/famillePrestation/famillePrestation.jsp";
    }

    @RequestMapping("MajFamillePrestation")
    public String MajFamillePrestation(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/famillePrestation/MajFamillePrestation.jsp";
    }

    @RequestMapping("sousFamillePrestation")
    public String sousFamillePrestation(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/sousFamillePrestation/sousFamillePrestation.jsp";
    }

    @RequestMapping("MajSousFamillePrestation")
    public String MajSousFamillePrestation(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/sousFamillePrestation/MajSousFamillePrestation.jsp";
    }

    @RequestMapping("Chambre")
    public String Chambre(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/Chambre/Chambre.jsp";
    }

    @RequestMapping("MajChambre")
    public String MajChambre(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/Chambre/MajChambre.jsp";
    }

    @RequestMapping("Service")
    public String Service(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/Service/Service.jsp";
    }

    @RequestMapping("MajService")
    public String MajService(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/Service/MajService.jsp";
    }

    @RequestMapping("categorieChambre")
    public String categorieChambre(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/categorieChambre/categorieChambre.jsp";
    }

    @RequestMapping("MajCategorieChambre")
    public String MajCategorieChambre(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/categorieChambre/MajCategorieChambre.jsp";
    }

    @RequestMapping("etatChambre")
    public String etatChambre(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/etatChambre/etatChambre.jsp";
    }

    @RequestMapping("MajEtatChambre")
    public String MajEtatChambre(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp/etatChambre/MajEtatChambre.jsp";
    }
}
