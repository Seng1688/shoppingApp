import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {

    }

    storeRecipes() {
       const recipes =  this.recipeService.getRecipes();
       this.http.post('https://shoppingappdb-5cb18-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',recipes).subscribe(response => {
           console.log(response);
       })
    }
}