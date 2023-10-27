package com.rohit.blogappapis.services.impl;


import com.rohit.blogappapis.entities.Category;
import com.rohit.blogappapis.exceptions.ResourceNotFoundException;
import com.rohit.blogappapis.payloads.CategoryDto;
import com.rohit.blogappapis.repositories.CategoryRepository;
import com.rohit.blogappapis.services.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category=this.dtoToCategory(categoryDto);
        Category savedCategory=this.categoryRepository.save(category);
        return this.categoryToDto(savedCategory);
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId) {
        Category category=this.categoryRepository.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("Category","Category Id",categoryId));
        category.setCategoryTitle(categoryDto.getCategoryTitle());
        category.setCategoryDescription(categoryDto.getCategoryDescription());
        Category updatedCategory=this.categoryRepository.save(category);
        return this.categoryToDto(updatedCategory);
    }

    @Override
    public void deleteCategory(Integer categoryId) {
        Category category=this.categoryRepository.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("Category","Category Id",categoryId));
        this.categoryRepository.delete(category);

    }

    @Override
    public CategoryDto getCategoryById(Integer categoryId) {
        Category category=this.categoryRepository.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("Category","Category",categoryId));

        return this.categoryToDto(category);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories=this.categoryRepository.findAll();
        List<CategoryDto> categoryDtos = categories.stream().map(category -> this.categoryToDto(category)).collect(Collectors.toList());
        return categoryDtos;


    }

    public Category dtoToCategory(CategoryDto categoryDto)
    {
        Category category=this.modelMapper.map(categoryDto, Category.class);
        return category;

    }
    public CategoryDto categoryToDto(Category category)
    {
        CategoryDto categoryDto =this.modelMapper.map(category,CategoryDto.class);
        return categoryDto;
    }
}
