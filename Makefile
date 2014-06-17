name=$(shell basename `pwd`)
TARGET=$(name).js
SOURCES=$(shell find src -type f -name "*.js")

default: build

build: $(TARGET)

$(TARGET): $(SOURCES)
	cp src/$(name).js $(TARGET)
