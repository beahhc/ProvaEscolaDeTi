/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unicesumar.restserver.Disciplina;

import java.util.List;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Alunos
 */
@RestController
@RequestMapping (value="/disciplina")
@Transactional
public class DisciplinaController {
 
    @Autowired
    EntityManager em;
    
    @RequestMapping (method = RequestMethod.GET)
    public List <Disciplina> getDisciplinas (){
        return em.createQuery("from Disciplina").getResultList();
    }
    
    @RequestMapping (method = RequestMethod.POST)
    public void criarDisciplina (@RequestBody Disciplina d){
        em.persist(d);
    }
    
    @RequestMapping (method = RequestMethod.PUT)
    public void alterarDisciplina (@RequestBody Disciplina d){
       Disciplina disciplina= em.merge(d);
        em.persist(disciplina);
    }
    
    @RequestMapping (value= "/{id}",method = RequestMethod.DELETE)
    public void excluirDisciplina (@PathVariable Long id){
        Disciplina d = em.find(Disciplina.class, id);
        em.remove(d);
    }
    
}
