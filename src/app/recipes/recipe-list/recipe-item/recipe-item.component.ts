import { Component, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { LoggingService } from 'src/app/shared/logging.service';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  providers: [LoggingService]
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;
  @Input() index!: number;

  constructor(private loggingService: LoggingService, private recipeService: RecipeService) {}

}
