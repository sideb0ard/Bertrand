cmake_minimum_required(VERSION 3.10)

project(Bertrand VERSION 1.0)

# specify the C++ standard
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

add_executable(Bertrand main.cpp)

target_link_libraries(Bertrand PUBLIC easywsclient)

target_include_directories(Bertrand PUBLIC
  "${PROJECT_BINARY_DIR}"
  "${PROJECT_SOURCE_DIR}"
  )
