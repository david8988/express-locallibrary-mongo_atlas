let mongoose=require("mongoose");

let moment=require("moment");

let Schema= mongoose.Schema;

let AuthorSchema= new Schema(
    {
        first_name:{type:String,required:true,maxlength:100},
        family_name:{type:String,required:true,maxlength:100   },
        date_of_birth:{type:Date},
        date_of_death:{type:Date},
    }
);

//virtual for authors full name

AuthorSchema
.virtual("name")
.get(function(){
    // To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
    let fullname="";
    if(this.first_name && this.family_name){
        fullname= this.family_name+", "+this.first_name;
    }
    if(!this.first_name||!this.family_name){
        fullname="";
    }
    return fullname;

})



//virtual for author's URL
AuthorSchema
.virtual("url")
.get(function(){
    return "/catalog/author/"+this._id;
});


//adding the virtual property for the lifespan to the Author model
AuthorSchema.virtual('lifespan').get(function() {
    var lifetime_string = '';
    if (this.date_of_birth) {
      lifetime_string = moment(this.date_of_birth).format('MMMM Do, YYYY');
    }
    lifetime_string += ' - ';
    if (this.date_of_death) {
      lifetime_string += moment(this.date_of_death).format('MMMM Do, YYYY');
    }
    return lifetime_string;
  });

  AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
    return moment(this.date_of_birth).format('YYYY-MM-DD');
  });
  
  AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function() {
    return moment(this.date_of_death).format('YYYY-MM-DD');
  });



//export model

module.exports = mongoose.model("Author",AuthorSchema);

