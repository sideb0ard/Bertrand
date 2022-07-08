cmake_minimum_required(VERSION 3.10)

project(Bertrand VERSION 1.0)

# specify the C++ standard
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

find_package(Boost 1.40.0 REQUIRED system)
include_directories( ${Boost_INCLUDE_DIRS} )

add_executable(Bertrand main.cpp)

target_link_libraries(Bertrand ${Boost_LIBRARIES})

target_include_directories(Bertrand PUBLIC
  "${PROJECT_BINARY_DIR}"
  "${PROJECT_SOURCE_DIR}/websocketpp"
  )

add_executable(BertrandClient client.cpp)
target_link_libraries(BertrandClient ${Boost_LIBRARIES})

target_include_directories(BertrandClient PUBLIC
  "${PROJECT_BINARY_DIR}"
  "${PROJECT_SOURCE_DIR}/websocketpp"
  )
