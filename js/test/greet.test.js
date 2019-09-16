describe('Testing Greetings Fucntion' , function(){
    it('should greet the persons name in english if the radio button english has been clicked ' , function(){
        var instance = Greetings();

   assert.deepEqual("Hello, SBU", instance.greet("Sbu", "English"))
    });

    it('should greet the persons name in Zulu if the radio button zulu has been clicked ' , function(){
        var instance = Greetings();

   assert.deepEqual("Sawubona, SBU", instance.greet("Sbu", "Zulu"))
    });
    it('should greet the persons name in Afrikaans if the radio button afrikaans has been clicked ' , function(){
        var instance = Greetings();

   assert.deepEqual("Hallo, SBU", instance.greet("Sbu", "Afrikaans"))
    });
    it('should greet the persons name in english if the radio button english has been clicked ' , function(){
        var instance = Greetings();
        
   assert.deepEqual("Hallo, SBU", instance.greet("sbu", "Afrikaans"))
    });

});

describe('Testing Object' , function(){

    it('should return the names greeted in an object storage ' , function(){
        var instance = Greetings();
        instance.greet("axola","English");
        instance.greet("samu","Zulu");
        instance.greet("veno","English");
   assert.deepEqual(instance.objectName(),{ AXOLA: 0, SAMU: 0, VENO: 0 })
    });
    
    it('should not greet the same person twice ' , function(){
        var instance = Greetings();
        instance.greet("veno","Zulu");
        instance.greet("veno","English");
   assert.deepEqual(instance.objectName(),{ VENO: 0 })
    });

});


    describe('Testing Counter' , function(){
    it('should return the number of people greeted  ' , function(){
        var instance = Greetings();
        instance.greet("musa","English");
        instance.greet("samu","English");
        instance.greet("ayabonga","English");
        instance.greet("xoli","English");
        instance.greet("sbu","English");
        instance.greet("teddy","English");
        instance.greet("lihle","English");
   assert.deepEqual(instance.count(),7);
    });

    it('should should not greet the same name twice' , function(){
        var instance = Greetings();
        instance.greet("musa","English");
        instance.greet("musa","English");
   assert.deepEqual(instance.count(),1);
    });
});

describe('Testing For Errors' , function(){

    it('should not greet or take in a name with numbers or invalid characters' , function(){
        var instance = Greetings();
        instance.greet("musa12");

   assert.deepEqual(instance.objectName(),{})
    });

    it('should not add anything if no name is entered or language selected' , function(){
        var instance = Greetings();
       instance.greet("","");

   assert.deepEqual(instance.objectName(),{})
    });


    it('should store the name in uppercase even if entered in lowercase' , function(){
        var instance = Greetings();
        instance.greet("musa","English");
        instance.greet("samu","English");
   assert.deepEqual(instance.objectName(),{ MUSA: 0, SAMU: 0 })
    });
});

//     it('should greet the persons name in english if the radio button english has been clicked ' , function(){
//         var instance = Greetings();
//         //instance.greet();
//         instance.greet("musa");
//         instance.greet("samu");
//         instance.greet("veno");
//    assert.deepEqual(instance.objectName(),{ musa: 0, samu: 0 })
//     });

//     it('should greet the persons name in english if the radio button english has been clicked ' , function(){
//         var instance = Greetings();
//         //instance.greet();
//         instance.greet("musa");
//         instance.greet("samu");
//         instance.greet("veno");
//    assert.deepEqual(instance.objectName(),{ musa: 0, samu: 0 })
//     });

//     it('should greet the persons name in english if the radio button english has been clicked ' , function(){
//         var instance = Greetings();
//         //instance.greet();
//         instance.greet("musa");
//         instance.greet("samu");
//         instance.greet("veno");
//    assert.deepEqual(instance.objectName(),{ musa: 0, samu: 0 })
//     });

//     it('should greet the persons name in english if the radio button english has been clicked ' , function(){
//         var instance = Greetings();
//         //instance.greet();
//         instance.greet("musa");
//         instance.greet("samu");
//         instance.greet("veno");
//    assert.deepEqual(instance.objectName(),{ musa: 0, samu: 0 })
//     });

//     it('should greet the persons name in english if the radio button english has been clicked ' , function(){
//         var instance = Greetings();
//         //instance.greet();
//         instance.greet("musa");
//         instance.greet("samu");
//         instance.greet("veno");
//    assert.deepEqual(instance.objectName(),{ musa: 0, samu: 0 })
//     });

//     it('should greet the persons name in english if the radio button english has been clicked ' , function(){
//         var instance = Greetings();
//         //instance.greet();
//         instance.greet("musa");
//         instance.greet("samu");
//         instance.greet("veno");
//    assert.deepEqual(instance.objectName(),{ musa: 0, samu: 0 })
//     });

//     it('should greet the persons name in english if the radio button english has been clicked ' , function(){
//         var instance = Greetings();
//         //instance.greet();
//         instance.greet("musa");
//         instance.greet("samu");
//         instance.greet("veno");
//    assert.deepEqual(instance.objectName(),{ musa: 0, samu: 0 })
//     });

 