class TasksController < ApplicationController
	def index
		task = Task.all 
		render json: task
	end
	def create
		task = Task.new(permit)
		if task.valid?
			task.save
			render json: task
		else
			render json: task.errors.messages			
		end
	end
	def update
		valid = Task.exists?(params[:id].to_i)
		if valid
			task = Task.update(params[:id].to_i, permit)
			render json: task
		else
			render json: task.errors.messages
		end
	end

	def done
		exist = Task.exists?(params[:id])
		if exist
			task = Task.find(params[:id])
			if task[:status] == "done"
				status = {"status" => "undone"}
			else
				status = {"status" => "done"}
			end
			task = Task.update(params[:id], status)
			render json: task
		else
			render json: {"error" => "La tarea no existe"}
		end
	end

	private
		def permit
			params.permit(:title, :status, :date, :priority, :category_id)
		end
end
