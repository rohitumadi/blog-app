package com.rohit.blogappapis.services.impl;

import com.rohit.blogappapis.entities.Category;
import com.rohit.blogappapis.entities.Post;
import com.rohit.blogappapis.entities.User;
import com.rohit.blogappapis.exceptions.ResourceNotFoundException;
import com.rohit.blogappapis.payloads.PostDto;
import com.rohit.blogappapis.payloads.PostResponse;
import com.rohit.blogappapis.repositories.CategoryRepository;
import com.rohit.blogappapis.repositories.PostRepository;
import com.rohit.blogappapis.repositories.UserRepository;
import com.rohit.blogappapis.services.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public PostDto createPost(PostDto postDto,Integer userId,Integer categoryId) {
        User user=this.userRepository.
                findById(userId).
                orElseThrow(()->new ResourceNotFoundException("User","id",userId));

        Category category=this.categoryRepository.
                findById(categoryId).
                orElseThrow(()->new ResourceNotFoundException("Category","Category",categoryId));


        Post post = this.dtoToPost(postDto);
        post.setImageName("default.png");
        post.setDateCreated(new Date());
        post.setUser(user);
        post.setCategory(category);

        Post savedPost=this.postRepository.save(post);
        return this.postToDto(savedPost);
    }

    @Override
    public PostDto updatePost(PostDto postDto, Integer postId) {
        Post post=this.postRepository
                .findById(postId)
                .orElseThrow(()->new ResourceNotFoundException("Post","Postid",postId));
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setImageName(postDto.getImageName());

        Post updatedPost=this.postRepository.save(post);
        return this.postToDto(updatedPost);

    }

    @Override
    public PostDto getPostById(Integer postId) {
        Post post=this.postRepository.findById(postId).orElseThrow(()->new ResourceNotFoundException("Post","postId",postId));

        PostDto postDto=this.postToDto(post);
        System.out.println(postDto);
        return postDto;
    }

    @Override
    public PostResponse getAllPosts(Integer pageNumber, Integer pageSize,String sortBy,String sortDir) {
        Sort sort=null;
        if(sortDir.equalsIgnoreCase("asc"))
        {
            sort=Sort.by(sortBy).ascending();
        }
        else{
            sort=Sort.by(sortBy).descending();

        }

        Pageable p= PageRequest.of(pageNumber,pageSize,sort);
        Page<Post> pagePost = this.postRepository.findAll(p);

        List<Post> allPost = pagePost.getContent();
        List<PostDto> postDtoList = allPost
                .stream()
                .map((post) -> this.postToDto(post)).toList();
        PostResponse postResponse=new PostResponse();
        postResponse.setContent(postDtoList);
        postResponse.setPageNumber(pagePost.getNumber());
        postResponse.setPageSize(pagePost.getSize());
        postResponse.setTotalElements(pagePost.getTotalElements());
        postResponse.setTotalPages(pagePost.getTotalPages());
        postResponse.setLastPage(pagePost.isLast());

        return postResponse;

    }

    @Override
    public PostResponse getPostsByCategory(Integer pageNumber, Integer pageSize,Integer categoryId) {
        Pageable p=PageRequest.of(pageNumber,pageSize);
        Category category =this.categoryRepository
                .findById(categoryId).
                orElseThrow(()->new ResourceNotFoundException("category","categoryId",categoryId));
        Page<Post> pagePost=this.postRepository.findByCategory(p,category);
        List<Post> allPost=pagePost.getContent();
        List<PostDto> postDtoList = allPost
                .stream()
                .map((post) -> this.postToDto(post)).toList();
        PostResponse postResponse=new PostResponse();
        postResponse.setContent(postDtoList);
        postResponse.setPageNumber(pagePost.getNumber());
        postResponse.setPageSize(pagePost.getSize());
        postResponse.setTotalElements(pagePost.getTotalElements());
        postResponse.setTotalPages(pagePost.getTotalPages());
        postResponse.setLastPage(pagePost.isLast());

        return postResponse;
    }

    @Override
    public void deletePost(Integer postId) {
        this.postRepository.deleteById(postId);


    }


    @Override
    public PostResponse getPostsByUser(Integer pageNumber  , Integer pageSize,Integer userId) {
        Pageable p=PageRequest.of(pageNumber,pageSize);
        User user =this.userRepository
                .findById(userId).
                orElseThrow(()->new ResourceNotFoundException("user","userId",userId));
        Page<Post> pagePost=this.postRepository.findByUser(p,user);
        List<Post> allPost=pagePost.getContent();
        List<PostDto> postDtoList = allPost
                .stream()
                .map((post) -> this.postToDto(post)).toList();
        PostResponse postResponse=new PostResponse();
        postResponse.setContent(postDtoList);
        postResponse.setPageNumber(pagePost.getNumber());
        postResponse.setPageSize(pagePost.getSize());
        postResponse.setTotalElements(pagePost.getTotalElements());
        postResponse.setTotalPages(pagePost.getTotalPages());
        postResponse.setLastPage(pagePost.isLast());

        return postResponse;

    }

    @Override
    public List<PostDto> searchPosts(String keyword) {
        List<Post> postDto=this.postRepository.findByTitleContaining(keyword);
//        List<Post> postDto=this.postRepository.findByTitleContaining("%"+keyword+"%");
        List<PostDto> postsDto=postDto.stream().map((post) -> this.postToDto(post)).toList();
        return postsDto;
    }

    public Post dtoToPost(PostDto postDto)
    {
        Post post=this.modelMapper.map(postDto, Post.class);
        return post;

    }
    public PostDto postToDto(Post post)
    {
        PostDto postDto =this.modelMapper.map(post,PostDto.class);
        return postDto;
    }
}
