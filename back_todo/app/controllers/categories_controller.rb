class CategoriesController < ApplicationController
  def create 
    categories = Category.new(permit)
    if categories.valid?
      categories.save
      render json: categories
    else
      render json: categories.errors
    end
  end
    


	def list
		categories = Category.all 
		if categories == nil
			render json:  {"error" => "No hay categorias que listar"}
    else
      render json: categories
    end   
	end

  def permit
    params.permit(:name)
  end
end


