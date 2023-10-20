package com.knf.dev.demo.controller;

import java.util.List;

import com.knf.dev.demo.entity.Student;
import com.knf.dev.demo.exception.ResourceNotFoundException;
import com.knf.dev.demo.repository.StudentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable(value = "id")
                  Long id) throws ResourceNotFoundException {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("Student not found for this id :: " + id));
        return ResponseEntity.ok().body(student);
    }

    @PostMapping("/students")
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable(value = "id")
                         Long id, @RequestBody Student studentDto)
            throws ResourceNotFoundException {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("Student not found for this id :: " + id));

        student.setEmail(studentDto.getEmail());
        student.setLastName(studentDto.getLastName());
        student.setFirstName(studentDto.getFirstName());
        student.setGender(studentDto.getGender());
        student.setAge(studentDto.getAge());
        student.setGrade(studentDto.getGrade());
        student.setQualification(studentDto.getQualification());
        student.setId(id);
        final Student updateStudent = studentRepository.save(student);
        return ResponseEntity.ok(updateStudent);
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Boolean> deleteStudent(@PathVariable(value = "id")
                     Long id) throws ResourceNotFoundException {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("Student not found for this id :: " + id));

        studentRepository.delete(student);

        return ResponseEntity.ok(true);
    }
}