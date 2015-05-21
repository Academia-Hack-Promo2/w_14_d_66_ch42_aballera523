class TasksController < ApplicationController

	def index
		task = Task.all 
    if task.exists?
		  render json: task, :except => [:created_at, :updated_at]
    else
      render json: {"Mensaje":"No Hay Tareas Que Mostrar"}
    end

	end

	def create
		task = Task.new(permit)
		if task.category_id == nil
			category =	Category.find_by name: 'uncategorized'
			if category
				task.category_id = category.id			
			else
				category = Category.new
				category.name = 'uncategorized'
				category.save
				task.category_id = category.id
			end
		end
		if task.valid?
			task.save
			render json: task, :except => [:title, :status, :priority, :date, :category_id, :created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}			
		end
	end

	def update
		valid = Task.exists?(params[:id].to_i)
		if valid
			task = Task.update(params[:id].to_i, permit)
			render json: task, :except => [:title, :status, :priority, :date, :category_id, :created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end
	end

	def show
		valid = Task.find(params[:id].to_i)
		if valid
			render json: valid, :except =>[:created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end	
	end
#los metodos deben ser en minusci¿ulas y con _
	def updateStatus
		if Task.exists?(params[:id].to_i)
			task = Task.update(params[:id], permit)
			render json: task, :except => [:title, :priority, :date, :category_id, :created_at, :updated_at]
		else
			render json: {"id":nil, "error":"Mensaje de error "}
		end
	end
	
	def destroy
		task = Task.find(params[:id].to_i)
    if task
			task.delete
			render json: {"result":true}
		else
			render json: {"result":false, "error":"Mensaje de error"}
		end
	end

	private

	def permit
		params.permit(:title, :status, :date, :priority, :category_id)
	end
end
