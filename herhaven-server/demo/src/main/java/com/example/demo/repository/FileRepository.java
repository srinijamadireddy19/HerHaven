package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.FileDocument;

@Repository
public interface FileRepository extends MongoRepository<FileDocument, String> {
}