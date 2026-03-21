# Installed CMake version
cmake_minimum_required(VERSION 4.3.0)
# Project name, version, and description
project(newp-bot VERSION 1.0 DESCRIPTION "A new and improved bot for the NEWP discord server")

list(APPEND CMAKE_MODULE_PATH ${CMAKE_CURRENT_SOURCE_DIR}/cmake)

# Create executable
add_executable(${PROJECT_NAME}
    src/main.cpp
)

# Find DPP package
find_package(DPP REQUIRED)

# Link DPP package
target_link_libraries(${PROJECT_NAME}
    ${DPP_LIBRARIES}
)

# Include DPP directories
target_include_directories(${PROJECT_NAME} PRIVATE
    ${DPP_INCLUDE_DIR}
)

# Set C++ version
set_target_properties(${PROJECT_NAME} PROPERTIES
    CXX_STANDARD 20
    CXX_STANDARD_REQUIRED ON
)