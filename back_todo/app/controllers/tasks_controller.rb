class TasksController < ApplicationController
	def index
		task = Task.all 
		render json: task, :except => [:created_at, :updated_at]
	end
	def create
		task = Task.new(permit)
		if task.category_id == nil
			category =	Category.find_by name: 'uncategorised'
			if category
				task.category_id = category.id			
			else
				category = Category.new
				category.name = 'uncategorised'
				category.save
				task.category_id = category.id
			end
		end
		if task.valid?
			task.save
			render json: task, :except => [:created_at, :updated_at]
		else
			render json: task.errors.messages			
		end
	end

	def update
		valid = Task.exists?(params[:id].to_i)
		if valid
			task = Task.update(params[:id].to_i, permit)
			render json: task, :except => [:created_at, :updated_at]
		else
			render json: task.errors.messages
		end
	end

	def updateStatus
	task = Task.find(params[:id])
		if task
			st = params[:status].to_i			
			if st == 1
				params[:status] = "done"
			else
				params[:status] = "undone"
			end
			if task.update(permit)
				render json: task
			else
				render json: {"Error 404" => task.errors}
			end
		else
			render json: {"Error 404" => "Esa tarea no existe"}
		end
	end

	def destroy
		valid = Task.exists?(params[:id].to_i)
		if valid
			task = Task.find(params[:id].to_i)
			task.delete
			render json: task, :except => [:created_at, :updated_at]
		else
			render json: {"Error 404" => "Esa tarea no existe"}
		end
	end

	private
	def permit
		params.permit(:title, :status, :date, :priority, :category_id)
	end
end
